// Author @kyndinfo - 2016
// Title: Quadratic Bezier
// http://www.kynd.info
//
// Original bezier function by Golan Levin and Collaborators
// http://www.flong.com/texts/code/shapers_bez/

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float blinnWyvillCosineApproximation (float x){
  float x2 = x*x;
  float x4 = x2*x2;
  float x6 = x4*x2;
  
  float fa = ( 4.0/9.0);
  float fb = (17.0/9.0);
  float fc = (22.0/9.0);
  
  float y = fa*x6 - fb*x4 + fc*x2;
  return y;
}

float lineSegment(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a, ba = b - a;
    float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
    return smoothstep(0.0, 1.0 / u_resolution.x, length(pa - ba*h));
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
	float px = 1.0 / u_resolution.y;
    
    // control point
    vec2 cp = vec2(cos(u_time),sin(u_time)) * 0.45 + 0.5;
    float l = blinnWyvillCosineApproximation (st.x);
    vec3 color = vec3(smoothstep(l, l+px, st.y));
    
    gl_FragColor = vec4(color, 1.0);
}