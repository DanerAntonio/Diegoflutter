const User = require('../models/user');
const { connectDB } = require('../lib/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function register(formData) {
  try {
    await connectDB();

    const email = formData.get('email');
    const password = formData.get('password');
    const name = formData.get('name');

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { error: 'El usuario ya existe' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    return { token };
  } catch (error) {
    return { error: 'Fallo en el registro' };
  }
}

async function login(formData) {
  try {
    await connectDB();

    const email = formData.get('email');
    const password = formData.get('password');

    const user = await User.findOne({ email });
    if (!user) {
      return { error: 'Usuario no encontrado' };
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return { error: 'Contraseña inválida' };
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    return { token };
  } catch (error) {
    return { error: 'Fallo en el inicio de sesión' };
  }
}

module.exports = { register, login };

