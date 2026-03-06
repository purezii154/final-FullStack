const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

// อนุญาตให้ Frontend ข้ามโดเมนมาดึงข้อมูลได้
app.use(cors());
app.use(express.json());

// ✅ API Health Check (สำหรับตรวจงาน)
app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: "Backend is running smoothly!" });
});

// ✅ API Tasks (สำหรับดึงข้อมูลจาก Database)
app.get('/api/tasks', async (req, res) => {
  try {
    // โค้ดนี้จะทำงานได้สมบูรณ์ก็ต่อเมื่อเราตั้งค่าฐานข้อมูลเสร็จแล้ว
    const tasks = await prisma.task.findMany(); 
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});