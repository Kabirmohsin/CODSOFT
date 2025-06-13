const express = require('express');
const router = express.Router(); // 👈 Ye Express ka router hai
const verifyToken = require('../middleware/authMiddleware');
const Job = require('../models/Job');

// ✅ 1. POST: Job post karna (Login hone ke baad)
router.post('/post', verifyToken, async (req, res) => {
  try {
    const newJob = new Job({ ...req.body, postedBy: req.user.id });
    await newJob.save();
    res.status(201).json({ msg: 'Job posted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// ✅ 2. GET: Sare jobs dekhna
router.get('/all', async (req, res) => {
  try {
    const jobs = await Job.find().populate('postedBy', 'email');
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// ✅ 3. POST: Kisi job pe apply karna (Login hone ke baad)
router.post('/apply/:jobId', verifyToken, async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ msg: 'Job not found' });

    if (job.applicants.includes(req.user.id)) {
      return res.status(400).json({ msg: 'Already applied' });
    }

    job.applicants.push(req.user.id);
    await job.save();

    res.json({ msg: 'Applied to job successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

module.exports = router;
