import ImageKit from "@imagekit/nodejs";

const ImageKitClient = new ImageKit({
    publicKey: "public_1VX/t5zNuEdOG5xs6tnTCciH/E8=",
    privateKey: "private_hCgW2vyMnPV4MhzwNs+j6CjWUzA=",
    urlEndpoint: "https://ik.imagekit.io/omdev007"
});

export const uploadFile = async (file) => {
    const result = await ImageKitClient.files.upload({
        file: file, // base64
        fileName: "music_" + Date.now() + ".mp3",
        folder: "/sportifyClone/music",
    });

    return result;
};