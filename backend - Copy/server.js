const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/predict', (req, res) => {
    const symptoms = req.body.symptoms;
    
    // Use 'python' instead of 'python3' for Windows
    const python = spawn('python', ['predict.py', JSON.stringify({ symptoms })]);

    let dataString = '';
    let errorString = '';

    python.stdout.on('data', (data) => {
        dataString += data.toString();
    });

    python.stderr.on('data', (data) => {
        errorString += data.toString();
        console.error(`Python error: ${data}`);
    });

    python.on('close', (code) => {
        if (code !== 0) {
            console.error('Python process exited with code:', code);
            console.error('Error:', errorString);
            return res.status(500).json({ error: "Prediction error", details: errorString });
        }
        const prediction = dataString.trim();
        res.json({ disease: prediction });
    });

    python.on('error', (error) => {
        console.error('Failed to start Python process:', error);
        res.status(500).json({ error: "Failed to start prediction process" });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
