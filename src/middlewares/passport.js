import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '@/models/user';

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: 'secret'
};

export default passport => {
	passport.use(
		new JwtStrategy(opts, async (jwt_payload, done) => {
			try {
				const user = await User.findById(jwt_payload.id);
				done(null, user);
			} catch (err) {
				done(null, false);
			}
		})
	);
};
