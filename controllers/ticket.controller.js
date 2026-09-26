const { Ticket } = require("../model/ticketSchema");

// --------------------- create Ticket --------------------
const createTicket = async (req, res) => {
    try {
        const { 
            event_id, 
            seat_id, 
            price, 
            service_fee, 
            status_id, 
            ticket_type 
        } = req.body;

        const newTicket = new Ticket({
            event_id,
            seat_id,
            price,
            service_fee,
            status_id,
            ticket_type
        });

        await newTicket.save();
        return res.status(201).json({
            success: true,
            message: "Chipta muvaffaqiyatli yaratildi",
            ticket: newTicket
        });
    } catch (err) {
        return res.status(500).json({ 
            success: false, 
            message: "Server xatosi", 
            error: err.message 
        });
    }
};

// ---------------------- get tickets ------------------------
const getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find()
            .populate("event_id")
            .populate("seat_id")
            .populate("status_id");

        return res.status(200).json({ 
            success: true, 
            tickets 
        });
    } catch (err) {
        return res.status(500).json({ 
            success: false, 
            message: "Server xatosi", 
            error: err.message 
        });
    }
};

// ---------------------- get ticketBy ---------------------
const getTicketBy = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id)
            .populate("event_id")
            .populate("seat_id")
            .populate("status_id");

        if (!ticket) {
            return res.status(404).json({ success: false, message: "Chipta topilmadi" });
        }
        return res.status(200).json({ 
            success: true, 
            ticket 
        });
    } catch (err) {
        return res.status(500).json({ 
            success: false, 
            error: err.message 
        });
    }
};

// ---------------------- update ticket -------------------------
const updateTicket = async (req, res) => {
    try {
        const updatedTicket = await Ticket.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedTicket) {
            return res.status(404).json({ 
                success: false, 
                message: "Chipta topilmadi" 
            });
        }
        return res.status(200).json({
            success: true,
            message: "Chipta muvaffaqiyatli yangilandi",
            ticket: updatedTicket
        });
    } catch (err) {
        return res.status(500).json({ 
            success: false, 
            message: "Server xatosi", 
            error: err.message 
        });
    }
};

// ------------------------ delete ticket ------------------------
const deleteTicket = async (req, res) => {
    try {
        const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);
        if (!deletedTicket) {
            return res.status(404).json({ 
                success: false, 
                message: "Chipta topilmadi" 
            });
        }
        return res.status(200).json({ 
            success: true, 
            message: "Chipta o'chirildi" 
        });
    } catch (err) {
        return res.status(500).json({ 
            success: false, 
            message: "Server xatosi", 
            error: err.message 
        });
    }
};

module.exports = {
    createTicket,
    getTickets,
    getTicketBy,
    updateTicket,
    deleteTicket
};