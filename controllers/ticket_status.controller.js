const { TicketStatus } = require("../model/ticketStatusSchema");

// ---------------------- Create Ticket Status ---------------
const createTicketStatus = async (req, res) => {
    try {
        const { name } = req.body;

        const existingTicketStatus = await TicketStatus.findOne({ name });

        if (existingTicketStatus) {
            return res.status(400).json({
                success: false,
                message: "Bu chipta holati allaqachon mavjud"
            });
        } else {
            const newTicketStatus = new TicketStatus({
                name
            });

            await newTicketStatus.save();
            return res.status(201).json({
                success: true,
                message: "Chipta holati muvaffaqiyatli qo'shildi",
                data: newTicketStatus,
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server xatosi: Chipta holatini qo'shish jarayonida xato yuz berdi.",
        });
    }
};

// ---------------------- get ticket statuses --------------------------
const getTicketStatuses = async (req, res) => {
    try {
        const ticketStatuses = await TicketStatus.find({});
        res.json({
            success: true,
            message: "Barcha chipta holatlari ro'yxati olingan.",
            innerData: ticketStatuses,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server xatosi: Chipta holatlarini olishda xato yuz berdi.",
        });
    }
};

// ----------------------- get ticketStatusById --------------------------
const getTicketStatusById = async (req, res) => {
    try {
        const ticketStatusId = req.params.id;

        const ticketStatus = await TicketStatus.findById(ticketStatusId);

        if (!ticketStatus) {
            return res.status(404).json({
                success: false,
                message: "Chipta holati topilmadi"
            });
        }
        res.status(200).json({ message: "Chipta holati topildi", ticketStatus });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server xatosi" });
    }
};

// ----------------------- search ticketStatus --------------------------
const searchTicketStatus = async (req, res) => {
    try {
        // Swagger'dan keladigan 'name' yoki boshqa joydan kelishi mumkin bo'lgan 'query' parametrini olamiz
        const searchQuery = req.query.name || req.query.query;

        if (!searchQuery || typeof searchQuery !== "string" || !searchQuery.trim()) {
            return res.status(400).json({ message: "Invalid search query" });
        }

        const result = await TicketStatus.find({
            name: { $regex: searchQuery.trim(),$options: "i" }
        });

        if (result.length === 0) {
            return res.status(200).json({ message: "Chipta holati topilmadi", data: [] });
        }

        res.json(result);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server xatosi"
        });
    }
};

// ----------------------- update ticketStatus -------------------------
const updateTicketStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const updatedTicketStatus = await TicketStatus.findByIdAndUpdate(
            id,
            { name },
            { new: true }
        );

        if (!updatedTicketStatus) {
            return res.status(404).json({
                success: false,
                message: "Chipta holati topilmadi"
            });
        }

        res.json({
            success: true,
            message: "Chipta holati muvaffaqiyatli yangilandi",
            ticketStatus: updatedTicketStatus
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: err.message,
        });
    }
};

// ----------------------- delete ticketStatus -------------------------
const deleteTicketStatus = async (req, res) => {
    try {
        const deletedTicketStatus = await TicketStatus.findByIdAndDelete(req.params.id || req.body.id);

        if (!deletedTicketStatus) {
            return res.status(404).json({
                success: false,
                message: "Chipta holati topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Chipta holati muvaffaqiyatli o'chirildi",
            data: deletedTicketStatus
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Server Xatosi ${err.message}`
        });
    }
};

module.exports = {
    createTicketStatus,
    getTicketStatuses,
    getTicketStatusById,
    searchTicketStatus,
    updateTicketStatus,
    deleteTicketStatus
};