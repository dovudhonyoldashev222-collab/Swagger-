const { EventType } = require("../model/eventTypeSchema");

// ----------------------- create eventType ----------------------
const createEventType = async (req, res) => {
    try {
        const { name, parent_event_type_id } = req.body;
        const newType = new EventType({ name, parent_event_type_id });
        await newType.save();
        
        res.status(201).json({
            success: true,
            message: "Tadbir turi muvaffaqiyatli yaratildi",
            eventType: newType
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Server xatosi",
            error: err.message 
        });
    }
};

// ---------------------- get eventTypes -------------------------
const getEventTypes = async (req, res) => {
    try {
        const types = await EventType.find()
        .populate("parent_event_type_id");
        res.status(200).json({ 
            success: true, 
            eventTypes: types 
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Server xatosi",
            error: err.message 
        });
    }
};

// ----------------------- get EventType By -------------------
const getEventTypeBy = async (req, res) => {
    try {
        const type = await EventType.findById(req.params.id).populate("parent_event_type_id");
        if (!type) {
            return res.status(404).json({ 
                success: false, 
                message: "Tadbir turi topilmadi" 
            });
        }
        res.status(200).json({ 
            success: true, 
            eventType: type 
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Server xatosi",
            error: err.message 
        });
    }
};

// ----------------------- update eventType ---------------------------
const updateEventType = async (req, res) => {
    try {
        const updatedType = await EventType.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedType) {
            return res.status(404).json({ 
                success: false, 
                message: "Tadbir turi topilmadi" 
            });
        }
        res.status(200).json({
            success: true,
            message: "Muvaffaqiyatli yangilandi",
            eventType: updatedType
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Server xatosi",
            error: err.message 
        });
    }
};

// ------------------------- delete entType ---------------------------
const deleteEventType = async (req, res) => {
    try {
        const deletedType = await EventType.findByIdAndDelete(req.params.id);
        if (!deletedType) {
            return res.status(404).json({ 
                success: false, 
                message: "Tadbir turi topilmadi" 
            });
        }
        res.status(200).json({ 
            success: true, 
            message: "Muvaffaqiyatli o'chirildi" 
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message:"Server xatosi",
            error: err.message 
        });
    }
};

module.exports = {
    createEventType,
    getEventTypes,
    getEventTypeBy,
    updateEventType,
    deleteEventType
};