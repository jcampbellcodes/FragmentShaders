// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float circle(float radius, vec2 position, float width)
{
    vec2 st = gl_FragCoord.xy/u_resolution;
    return smoothstep(radius - width/2.0,radius, distance(st,position)) - smoothstep(radius, radius + width/2.0, distance(st,position));
}    


void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.0;

    // a. The DISTANCE from the pixel to the center
    pct = circle(0.3,vec2(0.5),0.064);

    // b. The LENGTH of the vector 
    //    from the pixel to the center 
    // vec2 toCenter = vec2(0.5)-st;
    // pct = length(toCenter);

    // c. The SQUARE ROOT of the vector 
    //    from the pixel to the center 
    // vec2 tC = vec2(0.5)-st;
    // pct = sqrt(tC.x*tC.x+tC.y*tC.y);

    vec3 color = vec3(pct);

	gl_FragColor = vec4( color, 1.0 );
}