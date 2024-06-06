const express = require('express');
const app = express();

function mean(nums) {
    return nums.reduce((a, b) => a + b) / nums.length;
}

function median(nums) {
    nums.sort((a, b) => a - b);
    const mid = Math.floor(nums.length / 2);
    return nums.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}

function mode(nums) {
    const freq = {};
    nums.forEach(num => freq[num] = (freq[num] || 0) + 1);
    let maxFreq = 0;
    let modes = [];
    for (const num in freq) {
        if (freq[num] > maxFreq) {
            modes = [num];
            maxFreq = freq[num];
        } else if (freq[num] === maxFreq) {
            modes.push(num);
        }
    }
    return modes.length === 1 ? parseInt(modes[0]) : modes.map(Number);
}

app.get('/mean', (req, res) => {
    if (!req.query.nums) {
      return res.status(400).json({ error: "nums are required" });
    }
    const nums = req.query.nums.split(',').map(Number);
    if (nums.some(isNaN)) {
      return res.status(400).json({ error: "All values must be numbers" });
    }
    return res.json({ operation: "mean", value: mean(nums) });
  });
  
  app.get('/median', (req, res) => {
    if (!req.query.nums) {
      return res.status(400).json({ error: "nums are required" });
    }
    const nums = req.query.nums.split(',').map(Number);
    if (nums.some(isNaN)) {
      return res.status(400).json({ error: "All values must be numbers" });
    }
    return res.json({ operation: "median", value: median(nums) });
  });
  
  app.get('/mode', (req, res) => {
    if (!req.query.nums) {
      return res.status(400).json({ error: "nums are required" });
    }
    const nums = req.query.nums.split(',').map(Number);
    if (nums.some(isNaN)) {
      return res.status(400).json({ error: "All values must be numbers" });
    }
    return res.json({ operation: "mode", value: mode(nums) });
  });
  
  app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
  });
  
  module.exports = app;