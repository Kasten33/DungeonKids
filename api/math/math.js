//functions for math operations

const stats = async (req, res) => {
    const { num1, num2 } = req.body;
    const sum = num1 + num2;
    const difference = num1 - num2;
    const product = num1 * num2;
    const quotient = num1 / num2;
    res.status(200).json({ sum, difference, product, quotient });
    };

    exports.stats = stats;