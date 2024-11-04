require('dotenv').config();
const destinatarios = require('./destinatarios.json');


const nodemailer = require('nodemailer');

// Configuração do transporte de email 

let transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
  },
});

// Função para enviar o email para cada destinatário
async function enviarEmails() {
  for (let destinatario of destinatarios) {
    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: destinatario,
      subject: 'Teste de email',
      text: 'Olá, esta é uma mensagem enviada com o Nodemailer!',
      html: '<h1>Olá!</h1><p>Esta é uma mensagem em HTML enviada com o Nodemailer.</p>',
    };

    try {
      let info = await transporter.sendMail(mailOptions);
      console.log(`E-mail enviado para ${destinatario}: ${info.response}`);
    } catch (error) {
      console.error(`Erro ao enviar e-mail para ${destinatario}:`, error);
    }
  }
}

// Executa a função de envio
enviarEmails();