import User from "../models/UserModel.js"

// page
export const loginPage = (req, res) => {
    res.render('login', {
        error: req.session.error
    })
}

export const registerPage = (req, res) => {
    res.render('register', {
        error: req.session.error
    })
}
// logic
export const login = async (req, res) => {
    const {
        email,
        password
    } = req.body
    const user = await User.findOne({
        email
    })
    if (!user) {
        req.session.error = 'Email not found. Are you already registered?'
        return res.redirect('/register')
    }
    const isPasswordMatch = await User.comparePassword(password)
    if (!isPasswordMatch) {
        req.session.error = 'Password invalid!'
        return res.redirect('/login')
    }

    // make new session
    req.session.user = {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
    }

    return res.redirect('/blog')
}

export const register = async (req, res) => {
    const {
        username,
        email,
        password
    } = req.body
    const existingUser = await User.findOne({
        $or: [{
            email
        }, {
            username
        }]
    })
    if (existingUser) {
        req.session.error = 'Email or Username already Exists!'
    }

    const newUser = new User({
        username,
        email,
        password
    })

    await newUser.save()
    res.redirect('/login')
}

export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) console.error('Logout Error' + err)
        res.redirect('/auth/login')
    })
}