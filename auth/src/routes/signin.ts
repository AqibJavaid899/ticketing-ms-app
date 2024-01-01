import express from 'express'

const router = express.Router();

router.post('/api/users/signin', (req, res) => {
    res.json({ message: "Signin Success!" })
});

export { router as signinRouter };