const authConfig = {
    JWT: {
        secret: process.env.AUTH_SECRET,
        expiresIn: '7d'
    }
}

export default authConfig;