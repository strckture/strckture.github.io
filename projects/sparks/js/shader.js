function getShader(_renderer) {
	const vert = `
		precision lowp float;
		attribute vec3 aPosition;
		attribute vec2 aTexCoord;
		varying vec2 vTexCoord;

		void main() {
			vTexCoord = aTexCoord;
			vec4 positionVec4 = vec4(aPosition, 1.0);
			positionVec4.xy = positionVec4.xy*2.-1.; 
			gl_Position = positionVec4;
		}
	`;
	const frag = `
		precision mediump float;
		varying vec2 vTexCoord;
		const float WIDTH=${windowWidth}.;
		const float HEIGHT=${windowHeight}.;
		uniform vec3 balls[${num}];

		void main() {
			float x=vTexCoord.x*WIDTH;
			float y=HEIGHT-vTexCoord.y*HEIGHT;
			float v=0.;
			for (int i=0;i<${num};i++) {
				vec3 b=balls[i];
				v+=b.z*b.z/((b.x-x)*(b.x-x)+(b.y-y)*(b.y-y));
			}
			v=sqrt(v);
			gl_FragColor = vec4(v,  v-.5    ,.15     , 1);
		}
	`;
	return new p5.Shader(_renderer, vert, frag);
}