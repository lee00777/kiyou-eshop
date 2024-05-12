export default function colorMatch(color) {
    if (color === "red") {
        return <p className="h-2 w-2 mr-1 rounded-full bg-red-500"></p>;
    } else if (color === "black") {
        return <p className="h-2 w-2 mr-1 rounded-full bg-black"></p>;
    } else if (color === "gray") {
        return <p className="h-2 w-2 mr-1 rounded-full bg-gray-500"></p>;
    } else if (color === "pink") {
        return <p className="h-2 w-2 mr-1  rounded-full bg-pink-500"></p>;
    } else if (color === "beige") {
        return <p className="h-2 w-2 mr-1  rounded-full bg-gray-300"></p>;
    } else if (color === "green") {
        return <p className="h-2 w-2 mr-1 rounded-full bg-green-500"></p>;
    } else if (color === "darkblue") {
        return <p className="h-2 w-2 mr-1 rounded-full bg-blue-500"></p>;
    } else if (color === "ivory") {
        return <p className="h-2 w-2 mr-1 rounded-full bg-gray-100"></p>;
    } else if (color === "lightblue") {
        return <p className="h-2 w-2 mr-1 rounded-full bg-blue-300"></p>;
    } else if (color === "white") {
        return <p className="h-2 w-2 mr-1 rounded-full bg-stone-100"></p>;
    } else if (color === "purple") {
        return <p className="h-2 w-2 mr-1 rounded-full bg-purple-300"></p>;
    } else if (color === "brown") {
        return <p className="h-2 w-2 mr-1 rounded-full bg-orange-900"></p>;
    }
}
