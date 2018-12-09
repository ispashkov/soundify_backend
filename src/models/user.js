import { Schema, model } from "mongoose";
import { ROLE_USER } from "@/constants/roles";

/**
 * User model
 */
const userSchema = Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: { type: String, required: true, select: false },
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  favoriteSongs: { type: Array },
  role: { type: Number, required: true, default: ROLE_USER }
});

export default model("User", userSchema);
