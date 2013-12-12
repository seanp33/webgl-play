function execute(conf) {
    var count = conf.count;
    var color_palette = conf.color_palette;
    var color_tail = color_palette.length-1;
    var max_edges_per_node = conf.max_edges_per_node;
    var existing_node_count = conf.existing_node_count || 0;
    var max_dim = conf.area/2;
    var min_dim = max_dim*-1;
    var nodes = [];
    var edges = [];

    for (var i = 0; i < count; i++) {
        var ip = randIp(255);
        var port = rand(100, 9000);
        var color = color_palette[rand(0, color_tail)];
        var severity = rand(0, 10);
        var x = rand(min_dim, max_dim);
        var y = rand(min_dim, max_dim);
        var z = rand(min_dim, max_dim);
        nodes.push({
            ip:ip,
            port:port,
            color:color,
            severity:severity,
            pos:{x:x,y:y,z:z}
        });
    }   
    
    var available_nodes = count + existing_node_count;
    for (var i = 0; i < count; i++) {
        var node = nodes[i];
        node.edges = [];
        var edge_count = rand(1, max_edges_per_node);
        for(var j = 0; j < edge_count; j++){
            var target = rand(0, available_nodes-1);
            while(target == i){
                target = rand(0, available_nodes-1);
            }
            
            node.edges.push(target);
        }
    }

    postMessage(nodes);

}

function rand(min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min);
}

function randIp() {
    var firstbyte = Math.round(Math.random() * 255);
    var secondbyte = Math.round(Math.random() * 255);
    var thirdbyte = Math.round(Math.random() * 255);
    var fourthbyte = Math.round(Math.random() * 255);

    return firstbyte + '.' + secondbyte + '.' + thirdbyte + '.' + fourthbyte;
}

onmessage = function(event) {
    if (event.data) {
        execute(event.data);
    } else {
        postMessage([]);
    }
}