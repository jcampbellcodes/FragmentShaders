// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    // make white
    vec3 color = vec3(0.0);
    
    
    float b = floor(st.x + 0.9);
    float l = floor(st.y + 0.9);
    float u = floor(1.0 - st.x + 0.772);
    float t = floor(1.0 - st.y + 0.852);
    
    color = vec3(b * l * u * t);

    gl_FragColor = vec4(color,1.0);
}