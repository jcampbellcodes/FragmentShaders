// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 rectangle(float width, float height)
{
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
	float b = step((1.0 - width), st.x);
    
    float l = step((1.0 - height), st.y);
    
    float u = step((1.0 - height), 1.0 - st.y);
    
    float t = step((1.0 - width), 1.0 - st.x);
    
    return vec3(b * l * u * t);
}

vec3 rectangleOutline(float width, float height, float outline)
{
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
	float l = step((width + outline), st.x) + (1.0 - step((width - outline), st.x));
    
    float b = step((1.0 - height + outline), st.y) + (1.0 - step((1.0 - height - outline), st.y));
    
    float r = step((width + outline), 1.0 - st.x) + (1.0 - step((width - outline), 1.0 - st.x));
    
    float t = step((1.0 - height + outline), 1.0 - st.y) + (1.0 - step((1.0 - height - outline), 1.0 -  st.y));
    
    return vec3(b * l * r * t);
}

void main() {
    
    // make white
    vec3 color = vec3(0.0);
    
    

    
    color = rectangleOutline(0.332,0.588, 0.004);

    gl_FragColor = vec4(color,1.0);
}