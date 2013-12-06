define([], function(){

    function ShaderGuts(v, f){
	this.vertex = v || "";
	this.fragment = f || "";
	this.somebool = true;
    }

    ShaderGuts.prototype = {}

    return ShaderGuts;
})
