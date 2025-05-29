import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

import transport from "../config/nodemailer.js";

export const register = async (req, res) => {
    const { name, rollNumber, email, password } = req.body;

    if (!name || !rollNumber || !email || !password) {
        return res.status(400).json({ success: false, message: "Please fill all the fields" });
    }

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists!" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({ name, rollNumber, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === 'prodcution' ? 'none' : "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });

        // Send verification email
        transport.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "🎉 Welcome to RequestHub!",
            text: `Hi ${name},

🎉 Welcome to RequestHub — we’re absolutely thrilled to have you onboard!

✅ Your account has been successfully created and you're all set to start exploring everything we have to offer.

💡 Whether you're here to submit, manage, or collaborate on requests — we’ve got your back every step of the way.

🤝 If you ever have questions, feedback, or need help, just drop us an email — we’re always happy to assist.

Thanks again for joining us — we’re excited for what’s ahead! 🚀

Warm regards,  
The RequestHub Team`
        }, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                return res.status(500).json({
                    success: false,
                    message: "Error sending verification email",
                });
            } else {
                console.log("Email sent:", info.response);
                res.status(200).json({ success: true, message: "Verification email sent" });
            }
        });





        return res.json({ success: true, message: "Registration Successful!" });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const login = async (req, res) => {
    const { rollNumber, email, password } = req.body;

    if (!rollNumber || !email || !password) {
        return res.status(400).json({ success: false, message: "Please fill all the fields" });
    }

    try {
        const user = await userModel.findOne({ rollNumber });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials!" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === 'prodcution' ? 'none' : 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });

        return res.json({ success: true, message: "Login Successful!" });

    }
    catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === 'prodcution' ? 'none' : 'strict',
        });

        return res.json({ success: true, message: "Logout Successful!" });
    }
    catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

export const sendVerifyOtp = async (req, res) => {
    try {
        const user = req.user; 

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.isAccountVerified) {
            return res.status(400).json({
                success: false,
                message: "Account is already verified."
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 10 * 60 * 1000; // 10 minutes

        await user.save();

        const { email, name } = user;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "🔐 Verify Your RequestHub Account",
            text: `Hi ${name},\n\nWelcome to RequestHub!\n\nYour OTP is ${otp}. It is valid for 10 minutes.\n\nThanks,\nRequestHub Team`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                    <h2>Hi ${name},</h2>
                    <p>🎉 <strong>Welcome to RequestHub!</strong> We're thrilled to have you with us.</p>
                    <p>Please use the OTP below to verify your account. This code is valid for <strong>10 minutes</strong>:</p>
                    <div style="font-size: 22px; font-weight: bold; color: #2F54EB; background-color: #F0F4FF; padding: 12px 24px; width: fit-content; border-radius: 8px; border: 1px solid #d6e4ff;">
                        ${otp}
                    </div>
                    <p>If you didn't request this, please ignore this email.</p>
                    <br/>
                    <p>Warm regards,</p>
                    <p><strong>The RequestHub Team</strong></p>
                </div>
            `
        };

        await new Promise((resolve, reject) => {
            transport.sendMail(mailOptions, (error, info) => {
                if (error) return reject(error);
                resolve(info);
            });
        });

        return res.status(200).json({
            success: true,
            message: "Verification email sent successfully.",
        });

    } catch (error) {
        console.error("Error in sendVerifyOtp:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "An unexpected error occurred.",
        });
    }
};

export const verifyEmail = async (req, res) => {
    const { userId, otp } = req.body;
    if (!userId || !otp) {
        return res.status(400).json({ success: false, message: "Missing Details" });
    }

    try {
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found!" });
        }

        if (user.verifyOtp !== otp || user.verifyOtp === '') {
            return res.status(400).json({ success: false, message: "Invalid OTP!" });
        }

        if (user.verifyOtpExpireAt < Date.now()) {
            return res.status(400).json({ success: false, message: "OTP expired!" });
        }
        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save();

        return res.json({ success: true, message: "Account verified successfully!" });

    }
    catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const isAuthenticated = async (req, res) => {
    try {
        return res.json({ success: true });
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

export const sendResetOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: "Please provide an email address" });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found!" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 10 * 60 * 1000; // Expires in 10 minutes

        await user.save();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "🔐 Reset Your RequestHub Password",
            text: `Hi ${user.name},\n\nYour OTP for password reset is ${otp}. It is valid for 10 minutes.\n\nThanks,\nRequestHub Team`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                    <h2>Hi ${user.name},</h2>
                    <p>We received a request to reset your password.</p>
                    <p>Your OTP for password reset is:</p>
                    <div style="font-size: 22px; font-weight: bold; color: #2F54EB; background-color: #F0F4FF; padding: 12px 24px; width: fit-content; border-radius: 8px; border: 1px solid #d6e4ff;">
                        ${otp}
                    </div>
                    <p>This code is valid for <strong>10 minutes</strong>.</p>
                    <p>If you didn’t request this, please ignore this email.</p>
                    <br/>
                    <p>Warm regards,</p>
                    <p><strong>The RequestHub Team</strong></p>
                </div>
            `
        };

        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                return res.status(500).json({
                    success: false,
                    message: "Failed to send reset OTP email.",
                });
            }

            console.log("Reset OTP email sent:", info.response);
            return res.status(200).json({
                success: true,
                message: "Reset OTP sent successfully to your email.",
            });
        });

    } catch (err) {
        console.error("Error in sendResetOtp:", err);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
};

export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.status(400).json({ success: false, message: "Please fill all the fields" });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found!" });
        }

        if (user.resetOtp !== otp || user.resetOtp === '') {
            return res.status(400).json({ success: false, message: "Invalid OTP!" });
        }

        if (user.resetOtpExpireAt < Date.now()) {
            return res.status(400).json({ success: false, message: "OTP expired!" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;

        await user.save();

        return res.json({ success: true, message: "Password reset successfully!" });

    }
    catch (error) {
        return res.json({ success: false, message: error.message });
    }
}
