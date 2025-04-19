// tailwind.config.js
module.exports = {
	theme: {
		extend: {
			backgroundImage: {
				stripes: "repeating-linear-gradient(45deg, rgba(255,255,255,0.15) 0, rgba(255,255,255,0.15) 10px, transparent 10px, transparent 20px)"
			},
			animation: {
				stripes: "stripes 1s linear infinite"
			},
			keyframes: {
				stripes: {
					"0%": { backgroundPosition: "0 0" },
					"100%": { backgroundPosition: "40px 0" }
				}
			}
		}
	}
};
