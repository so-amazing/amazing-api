// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from "@adonisjs/core/http";
import User from "#models/user";

export default class AuthController {
  async login({ response, request }: HttpContext) {
    let body = request.body();
    const user = await User.verifyCredentials(body.email, body.password);
    if (!user) {
      return response.unauthorized({ message: "Invalid credentials" });
    }
    let token = await User.accessTokens.create(user);
    return {
      token: token.value?.release(),
      data: {
        ...user.toJSON(),
      },
    };
  }

  async register({ request }: HttpContext) {
    let body = request.body();
    let user = await User.create(body);
    return {
      data: {
        ...user.toJSON(),
      },
    };
  }

  async forgotPassword({ request }: HttpContext) {
    let body = request.body();
    let user = await User.findByOrFail("email", body.email);
    let rememberToken = Math.floor(Math.random() * 900000) + 100000;
    user.rememberToken = rememberToken.toString();
    await user.save();
    function formatPhoneNumber(phone: string) {
      if (phone.startsWith("07")) {
        return phone.replace("07", "2547");
      }
      return phone;
    }
    await this.sendRememberToken(
      formatPhoneNumber(user.phone ?? ""),
      `Your password reset token is ${rememberToken}`,
    );
    return {
      message: "Password reset link sent to your phone",
    };
  }

  async confirmResetToken({ request }: HttpContext) {
    let body = request.body();
    let user = await User.findByOrFail("rememberToken", body.rememberToken);
    if (!user) {
      return {
        status: 400,
        message: "Invalid token",
      };
    }
    return {
      status: 200,
      message: "Token is valid",
    };
  }

  async resetPassword({ request }: HttpContext) {
    let body = request.body();
    let user = await User.findByOrFail("rememberToken", body.rememberToken);
    user.password = body.password;
    user.rememberToken = null;
    await user.save();
    return {
      message: "Password reset successfully",
    };
  }

  async sendRememberToken(phone: string, message: string) {
    const response = await fetch(
      "https://smsportal.hostpinnacle.co.ke/SMSApi/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: process.env.HOST_PINNACLE_USER_ID,
          password: process.env.HOST_PINNACLE_USER_PASSWORD,
          senderid: process.env.HOST_PINNACLE_SENDER_ID,
          msgType: "text",
          duplicatecheck: "true",
          sendMethod: "quick",
          sms: [
            {
              mobile: [phone],
              msg: message,
            },
          ],
        }),
      },
    );

    console.log(await response.json());
  }
}
