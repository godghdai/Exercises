@control("/User")
class Test {
    say() {
        var b = { a: "b" };
        c = {
            ...b
        }
    }
    static bb() {
        var b = { a: "b" };
        c = {
            ...b
        }

        for (var i of foo) {}

    }
}

function control(path) {
    return function decorator(target) {
        target.path = path;
        target.prototype["__path"] = path;
    }
}

function control33(target, key, descriptor) {}

export default Test