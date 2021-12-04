import joi from 'joi';

const regexLink =  /(http(s)?:\/\/.)?(www\.)?(youtube\.)?(com\/watch)([-a-zA-Z0-9@:%_+.~#?&//=]*)/;

const recommendation = joi.object({
    name: joi.string().required(),
    youtubeLink: joi.string().pattern(regexLink),
});

export { recommendation };