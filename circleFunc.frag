// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;



vec3 circle(vec2 pos, float radius)
{
    vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.0;
    vec2 tC = pos-st;
    pct = 1.0 - step(radius, sqrt(tC.x*tC.x+tC.y*tC.y));
    return vec3(pct);
}

void main(){
    vec3 color = circle(vec2(0.490,0.890), 0.184);

	gl_FragColor = vec4( color, 0.0 );
}