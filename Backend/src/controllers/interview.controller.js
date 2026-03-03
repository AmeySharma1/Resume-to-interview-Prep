const pdfParse = require("pdf-parse")
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")

/**
 * @description Controller to generate interview report
 */
async function generateInterViewReportController(req, res) {
    try {

        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        const { selfDescription, jobDescription } = req.body

        if (!req.file && !selfDescription) {
            return res.status(400).json({
                message: "Either a Resume or a Self Description is required."
            })
        }

        let parsedResumeText = ""

        if (req.file) {
            let pdfContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()

            if (typeof pdfContent === 'object' && pdfContent.pages) {
                parsedResumeText = pdfContent.pages
                    .map(page => page.text || "")
                    .join("\n")
            } else if (pdfContent.text) {
                parsedResumeText = pdfContent.text
            } else {
                parsedResumeText = typeof pdfContent === 'string'
                    ? pdfContent
                    : JSON.stringify(pdfContent)
            }
        }

        const interViewReportByAi = await generateInterviewReport({
            resume: parsedResumeText,
            selfDescription,
            jobDescription
        })

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: parsedResumeText,
            selfDescription,
            jobDescription,
            ...interViewReportByAi
        })

        res.status(201).json({
            message: "Interview report generated successfully.",
            interviewReport
        })

    } catch (err) {
        console.error("generateInterViewReportController error:", err)
        res.status(500).json({ message: err.message || "Internal server error" })
    }
}

/**
 * @description Get interview report by ID (SECURE VERSION)
 */
async function getInterviewReportByIdController(req, res) {
    try {

        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        const { interviewId } = req.params

        const interviewReport = await interviewReportModel.findOne({
            _id: interviewId,
            user: req.user.id
        })

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found."
            })
        }

        res.status(200).json({
            message: "Interview report fetched successfully.",
            interviewReport
        })

    } catch (err) {
        console.error("getInterviewReportByIdController error:", err)
        res.status(500).json({ message: "Internal server error" })
    }
}

/**
 * @description Get all interview reports of logged-in user
 */
async function getAllInterviewReportsController(req, res) {
    try {

        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        const interviewReports = await interviewReportModel
            .find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

        res.status(200).json({
            message: "Interview reports fetched successfully.",
            interviewReports
        })

    } catch (err) {
        console.error("getAllInterviewReportsController error:", err)
        res.status(500).json({ message: "Internal server error" })
    }
}

/**
 * @description Generate Resume PDF (SECURE VERSION)
 */
async function generateResumePdfController(req, res) {
    try {

        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        const { interviewReportId } = req.params

        // 🔒 SECURITY FIX: restrict to logged-in user
        const interviewReport = await interviewReportModel.findOne({
            _id: interviewReportId,
            user: req.user.id
        })

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found."
            })
        }

        const { resume, jobDescription, selfDescription } = interviewReport

        const pdfBuffer = await generateResumePdf({
            resume,
            jobDescription,
            selfDescription
        })

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
        })

        res.send(pdfBuffer)

    } catch (err) {
        console.error("generateResumePdfController error:", err)
        res.status(500).json({ message: "Internal server error" })
    }
}

module.exports = {
    generateInterViewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController,
    generateResumePdfController
}