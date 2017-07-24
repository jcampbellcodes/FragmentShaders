// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

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

float circle2(float radius, vec2 position, float width)
{
    vec2 st = gl_FragCoord.xy/u_resolution;
    return smoothstep(radius - width/2.0,radius, distance(st,position)) - smoothstep(radius, radius + width/2.0, distance(st,position));
}    

float box(in vec2 _st, in vec2 _size){
    _size = vec2(0.5) - _size*0.5;
    vec2 uv = smoothstep(_size,
                        _size+vec2(0.001),
                        _st);
    uv *= smoothstep(_size,
                    _size+vec2(0.001),
                    vec2(1.0)-_st);
    return uv.x*uv.y;
}

float cross(in vec2 _st, float _size){
    return  box(_st, vec2(_size,_size/4.)) + 
            box(_st, vec2(_size/4.,_size));
}

vec2 brickTile(vec2 _st, float _zoom){
    _st *= _zoom;

    // Here is where the offset is happening
    _st.x += step(1., mod(_st.y,2.0)) * 0.5;

    return fract(_st);
}

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





vec3 simplexGrid (vec2 st) {
    vec3 xyz = vec3(0.0);

    vec2 p = fract(skew(st));
    if (p.x > p.y) {
        xyz.xy = 1.0-vec2(p.x,p.y-p.x);
        xyz.z = p.y;
    } else {
        xyz.yz = 1.0-vec2(p.x-p.y,p.y);
        xyz.x = p.x;
    }

    return fract(xyz);
}

vec2 tile(vec2 _st, float _zoom){
    _st *= _zoom;
    return fract(_st);
}



vec2 truchetPattern(in vec2 _st, in float _index){
    _index = fract(((_index-0.5)*2.0));
    if (_index > 0.75) {
        _st = vec2(1.0) - _st;
    } else if (_index > 0.5) {
        _st = vec2(1.0-_st.x,_st.y);
    } else if (_index > 0.25) {
        _st = 1.0-vec2(1.0-_st.x,_st.y);
    }
    return _st;
}

vec2 rotateTilePattern(vec2 _st){

    //  Scale the coordinate system by 2x2 
    _st *= 2.0;

    //  Give each cell an index number
    //  according to its position
    float index = 0.0;    
    index += step(1., mod(_st.x,2.0));
    index += step(1., mod(_st.y,2.0))*2.0;
    
    //      |
    //  2   |   3
    //      |
    //--------------
    //      |
    //  0   |   1
    //      |

    // Make each cell between 0.0 - 1.0
    _st = fract(_st);

    // Rotate each cell according to the index
    if(index == 1.0){
        //  Rotate cell 1 by 90 degrees
        _st = rotate2D(_st,PI*0.5);
    } else if(index == 2.0){
        //  Rotate cell 2 by -90 degrees
        _st = rotate2D(_st,PI*-0.5);
    } else if(index == 3.0){
        //  Rotate cell 3 by 180 degrees
        _st = rotate2D(_st,PI);
    }

    return _st;
}
