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

float doubleCubicSeat (float x, vec2 a){
  
  float epsilon = 0.00001;
  float min_param_a = 0.0 + epsilon;
  float max_param_a = 1.0 - epsilon;
  float min_param_b = 0.0;
  float max_param_b = 1.0;
  a.x = min(max_param_a, max(min_param_a, a.x));  
  a.y = min(max_param_b, max(min_param_b, a.y)); 
  
  float y = 0.0;
  if (x <= a.x){
    y = a.y- a.y*pow(1.0-x/a.x, 3.0);
  } else {
    y = a.y + (1.0-a.y)*pow((x-a.x)/(1.0-a.x), 3.0);
  }
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
    
    // control point -> moving a 2D point in space
    vec2 cp = vec2(cos(u_time),sin(u_time)) / 2.0;
    float l = doubleCubicSeat (st.x, cp);
    vec3 color = vec3(smoothstep(l, l+px, st.y));
    
    gl_FragColor = vec4(color, 1.0);
}