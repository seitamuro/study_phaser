float distanceField(vec2 points[6], vec2 uv) {
    points[5] = iMouse.xy / iResolution.xy;
    
    float min_dist = 1.;
    for(int i = 0;i < 6;i++) {
        float d = distance(uv, points[i]);
        if(min_dist > d) {
            min_dist = d;
        }
    }

    return min_dist;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy;
    
    vec2 rpoints[6];
    rpoints[0] = vec2(0., 0.);
    rpoints[1] = vec2(1., 1.);
    rpoints[2] = vec2(0., 1.);
    rpoints[3] = vec2(1., 0.);
    rpoints[4] = vec2(.5, .5);
    float r = distanceField(rpoints, uv);
    
    vec2 gpoints[6];
    gpoints[0] = vec2(.5, .5);
    gpoints[1] = vec2(0., .5);
    gpoints[2] = vec2(.5, 0.);
    gpoints[3] = vec2(1., .5);
    gpoints[4] = vec2(.5, 1.);
    float g = distanceField(gpoints, uv);
    
    // Output to screen
    fragColor = vec4(r, g, .3,1.0);
}