import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/usuario.js";

// Definimos nuestra clave secreta aquí (debe ser robusta y segura)
const SECRET_KEY = "your_secret_key_here";

class UsuariosService {
  async getAllUsuarios() {
    console.log('Fetching all users...');
    const Usuarios = await Usuario.findAll();
    console.log('Fetched users:', Usuarios);
    return Usuarios;
  }

  async getUsuarioById(id) {
    console.log(`Fetching user with ID: ${id}`);
    const Usuario = await Usuario.findByPk(id);
    if (!Usuario) {
      console.log(`user with ID: ${id} not found`);
    } else {
      console.log('Fetched user:', Usuario);
    }
    return Usuario;
  }

  async createUsuario(UsuarioData) {
    console.log('Creating new user with data:', UsuarioData);
    const hashedPassword = await bcrypt.hash(UsuarioData.contrasena, 10);  // Hashing the password
    const newUsuario = await Usuario.create({ ...UsuarioData, contrasena: hashedPassword });

    console.log('Created user:', newUsuario);
    return newUsuario;
  }

  async updateUsuario(id, UsuarioData) {
    console.log(`Updating user with ID: ${id}`);
    const Usuario = await Usuario.findByPk(id);

    if (!Usuario) {
      throw new Error('user not found');
    }

    await Usuario.update(UsuarioData);
    console.log('Updated user:', Usuario);
    return Usuario;
  }

  async deleteUsuario(id) {
    console.log(`Deleting user with ID: ${id}`);
    const Usuario = await Usuario.findByPk(id);

    if (!Usuario) {
      throw new Error('user not found');
    }

    await Usuario.destroy();
    console.log(`user with ID: ${id} deleted`);
    return { message: 'user deleted' };
  }

  async loginUsuario(email, contrasena) {
    console.log(`Logging in user with email: ${email}`);
    const Usuario = await Usuario.findOne({ where: { email } });
    
    if (!Usuario) {
      throw new Error('user not found');
    }

    const isPasswordValid = await bcrypt.compare(contrasena, Usuario.contrasena);
    
    if (!isPasswordValid) {
      throw new Error('Incorrect password');
    }

    const token = jwt.sign({ id: Usuario.id_Usuario, tipo_usuario: Usuario.tipo_usuario }, SECRET_KEY, { expiresIn: '1h' });
    
    console.log('Login successful, token generated:', token);
    
    return { message: 'Login successful', token };
  }

  async changePasswordUsuario(id, newPassword) {
    console.log(`Changing password for user with ID: ${id}`);
    const Usuario = await Usuario.findByPk(id);

    if (!Usuario) {
      throw new Error('user not found');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await Usuario.update({ contrasena: hashedNewPassword });
    
    return { message: 'Password updated successfully' };
  }
}

export default new UsuariosService();
