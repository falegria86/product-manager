export const productValidator = (req, res, next) => {
    const { title, description, price, code, stock, category, status } = req.body;
    if (!title || !description || !price || !category || !code || !stock || !status) {
        res.status(403).json({ message: 'All fields must be provided!' });
    } else if (isNaN(Number(price))) {
        res.status(403).json({ message: 'Price must be a number!' });
    } else if (isNaN(Number(stock))) {
        res.status(403).json({ message: 'Stock must be a number!' });
    } else {
        next();
    }
}