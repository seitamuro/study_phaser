void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalize
    vec2 st = fragCoord.xy / iResolution.xy;
    
    // Divide Screen
    st *= 8.;
    vec2 _st = floor(st);
    st = fract(st);
    
    // Rotate Screen
    float theta = 3.14*iTime/3.;
    if(mod(_st.x, 2.0) == 0.0 && mod(_st.y, 2.0) == 1.0) {
        theta *= -1.;
    }
    st = mat2(cos(theta), -sin(theta), sin(theta), cos(theta)) * st;
    
    // Show Color
    //st = abs(st);
    fragColor = vec4(abs(sin(3.14*2.*st.x)), abs(cos(3.14*2.*st.y)), abs(1.-st.x*st.y), 1.0);
}