const roomModel = require('../models/roomModel');

const updateRoom = async (req, res) => {
  const { roomName, roomType, price, description, roomId } = req.body;
  const imageUrl = req.file ? `http://localhost:3000/uploads/${req.file.filename}` : '';
  const hasImage = !!req.file; // Check if there's an image file

  try {
    const result = await roomModel.updateRoom(roomName, roomType, price, description, imageUrl, roomId, hasImage);
    res.status(201).json({ message: 'Thay đổi thông tin phòng thành công', result });
  } catch (error) {
    console.error('Lỗi thay đổi thông tin phòng:', error);
    res.status(500).json({ message: 'Lỗi thay đổi thông tin phòng', error });
  }
};

const insertRoom = async (req, res) => {
  const { roomName, roomType, price, description } = req.body;
  const imageUrl = req.file ? `http://localhost:3000/uploads/${req.file.filename}` : '';

  try {
    const result = await roomModel.insertRoom(roomName, roomType, price, description, imageUrl);
    res.status(201).json({ message: 'Thêm phòng thành công', result });
  } catch (error) {
    console.error('Lỗi thêm phòng:', error);
    res.status(500).json({ message: 'Lỗi thêm phòng', error });
  }
};


// Xử lý yêu cầu API để lấy danh sách phòng
const getRooms = async (req, res) => {
  try {
    const sortBy = req.query.sortBy || ''; // Lấy tham số sortBy từ query string
    const limit = req.query.limit || 12;   // Lấy tham số limit từ query string, mặc định là 12

    const rooms = await roomModel.getRooms(sortBy, limit);
    res.json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Xử lý yêu cầu API để lấy phòng theo ID
const getRoomById = async (req, res) => {
  try {
    const roomId = req.params.id;
    const limit = parseInt(req.query.limit, 10) || 7; // Giới hạn mặc định là 7 nếu không có truy vấn limit

    const room = await roomModel.getRoomById(roomId);
    if (room) {
      const otherRooms = await roomModel.getOtherRooms(roomId, limit);
      res.json({ room, otherRooms });
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  } catch (error) {
    console.error('Error fetching room by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteRoomById = async (req, res) => {
  try {
    const roomId = req.params.id;

    const result = await roomModel.deleteRoom(roomId);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Room not found' });
    } else {
      res.status(200).json({ message: 'Room deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting room:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  updateRoom,
  insertRoom,
  getRooms,
  getRoomById,
  deleteRoomById
};
