/*jshint esversion: 8 */

const express = require('express');
const natural = require('natural');

const app = express();
app.use(express.json());

const port = 3000;

// POST /sentiment endpoint
app.post('/sentiment', (req, res) => {
    try {
        const sentence = req.body.sentence;

        if (!sentence) {
            return res.status(400).json({ error: "Sentence is required" });
        }

        const analyzer = new natural.SentimentAnalyzer(
            "English",
            natural.PorterStemmer,
            "afinn"
        );

        const tokenizer = new natural.WordTokenizer();
        const tokens = tokenizer.tokenize(sentence);

        const score = analyzer.getSentiment(tokens);

        let sentiment = "";

        if (score < 0) {
            sentiment = "negative";
        } else if (score >= 0 && score <= 0.33) {
            sentiment = "neutral";
        } else {
            sentiment = "positive";
        }

        return res.json({
            sentence,
            score,
            sentiment
        });

    } catch (error) {
        return res.status(500).json({
            error: "Something went wrong",
            details: error.message
        });
    }
});

app.listen(port, () => {
    console.log(`Sentiment server running on port ${port}`);
});