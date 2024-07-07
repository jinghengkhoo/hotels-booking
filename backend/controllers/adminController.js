// Login Admin
export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      res.status(200).json({ msg: 'Admin logged in successfully' });
    } else {
      res.status(401).json({ msg: 'Invalid username or password' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
