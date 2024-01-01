import express from 'express'

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
    res.json({ message: "Signout Success!" })
})

export { router as signoutRouter };