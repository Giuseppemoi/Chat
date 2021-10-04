app.post('/register', async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      users.push({
        id: Date.now().toString(),
        usename: req.body.usename,
        email: req.body.email,
        password: hashedPassword
      })
      res.redirect('/login')
    } catch {
      res.redirect('/register')
    }
    console.log(users)
})
  
app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        Users.push({
            id: Date.now().toString(),
            usename: req.body.usename,
            email: req.body.email,
            password: hashedPassword    
        })
        res.redirect('/login')  
    } catch {
        res.redirect('/register')
    }
    console.log(Users)
})
