const { Event } = require("../model/eventSchema");

// ---------------------- create event ------------------
const createEvent = async (req, res) => {
    try {
        const {
            name,
            photo,
            start_date,
            start_time,
            finish_date,
            finish_time,
            info,
            event_type_id,
            human_category_id,
            venue_id,
            lang_id,
            release_date
        } = req.body;

        const newEvent = new Event({
            name,
            photo,
            start_date,
            start_time,
            finish_date,
            finish_time,
            info,
            event_type_id,
            human_category_id,
            venue_id,
            lang_id,
            release_date
        });

        await newEvent.save();
        res.status(201).json({
            success: true,
            message: "Tadbir muvaffaqiyatli yaratildi",
            event: newEvent
        });
    } catch (err) {
        res.status(500).json({ 
            success: false,
            message: "Server xatosi", 
            error: err.message 
        });
    }
};
// ----------------------- get events -----------------------
const getEvents = async (req, res) => {
    try {
        const events = await Event.find()
            .populate("event_type_id")
            .populate("human_category_id")
            .populate("venue_id");
        res.status(200).json({ 
            success: true, 
            events 
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Server xatosi",
            error: err.message 
        });
    }
};

// ------------------- get event by ------------------------
const getEventBy = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate("event_type_id")
            .populate("human_category_id")
            .populate("venue_id");
        if (!event) {
            return res.status(404).json({ 
                success: false, 
                message: "Tadbir topilmadi" 
            });
        }
        res.status(200).json({ 
            success: true, 
            event 
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Server xatosi",
            error: err.message 
        });
    }
};

// ---------------------- update event -----------------------
const updateEvent = async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedEvent) {
            return res.status(404).json({ 
                success: false, 
                message: "Tadbir topilmadi" 
            });
        }
        res.status(200).json({
            success: true,
            message: "Tadbir muvaffaqiyatli yangilandi",
            event: updatedEvent
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Server xatosi",
            error: err.message 
        });
    }
};

// ------------------------- delete events -------------------------
const deleteEvent = async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ 
                success: false,
                message: "Tadbir topilmadi" 
            });
        }
        res.status(200).json({ 
            success: true, 
            message: "Tadbir o'chirildi" 
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            error: err.message 
        });
    }
};

module.exports = {
    createEvent,
    getEvents,
    getEventBy,
    updateEvent,
    deleteEvent
};