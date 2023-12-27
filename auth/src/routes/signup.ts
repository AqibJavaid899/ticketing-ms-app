import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator';

const router = express.Router();

// req.body = { email: '...', password: "..." }

router.post('/api/users/signup', [
    body('email')
        .isEmail().withMessage('Email must be valid'),
    body('password')
        .trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20 characters'),
], (req: Request, res: Response) => {

    // pulling the validation error object from the request object where it was appended using validationResult()
    const errors = validationResult(req);
    console.log("Errors obj is : ", errors)

    // returning the errors object as a response to a user
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    console.log("\nCreating the user...")
    res.json({ message: "User Signup Success!" })
})

export { router as signupRouter };