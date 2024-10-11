particlesJS("background", {

    particles : {
        number: {
            value: 15, // Números de particulas
            density: {
                enable: true,
                value_area: 300, //Area onde as particulas irão ser distribuidas
            },
        },

        color: {
            value: "#ffffff", //Cor da particula
        },
        shape: {
            type: "triangle", // Tipo do shape
        },
        opacity: {
            value: 0.8, //Opacidade das particulas
            random: true,
            anum: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
            },
        },
        size: {
            value: 5, // Tamanho das particulas
            random: true,
            anim: {
                enable: true,
                speed: 4,
                size_min: 0.3,
                sync: false,
            },
        },

        // Conectando linhas
        line_linked: {
            enable: true,
            distance: 150,
            color:  "#ffffff",
            opacity: 0.4,
            width: 1,
        },

        // Movimento das particulas
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            out_mode: "bounce", // Comportamento das particulas quando saem do canvas
            bounce: false,
        },
    },

    // Configurações de interatividade
    
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "repulse",
            },
            onclick: {
                enable: true,
                mode: "push",
            },
            resize: true,
        },
    },

    retina_detect: true,
});