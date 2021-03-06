import Water from "./water";
import Viewer2D from "./viewer/viewer2D";
import Viewer3D from "./viewer/viewer3D";
import { Mouse } from "./mouse";

let mouse: Mouse = new Mouse(document.getElementById("glcanvas"));

function bindControls(water: Water, viewer2D: Viewer2D, viewer3D: Viewer3D): void {
    function bindInput(element: HTMLElement, func, input: string) {
        element.addEventListener(input, func, false);
        func();
    }

    {
        function setResolution(size: number, radio: HTMLInputElement) {
            if (radio.checked) {
                water.reset(size, size);
            }
        }
        const resolutions: number[] = [128, 256, 512];

        for (let res of resolutions) {
            const radioName = "quality-" + res + "-button";
            const radio = document.getElementById(radioName) as HTMLInputElement;
            const update = () => { setResolution(res, radio); };
            bindInput(radio, update, "change");
        }
    }

    {
        const rainCheckbox: HTMLInputElement = document.getElementById("rain-checkbox") as HTMLInputElement;
        const updateRain = () => { water.rain = rainCheckbox.checked; };
        bindInput(rainCheckbox, updateRain, "change");
    }

    {
        const tensionSlider: HTMLInputElement = document.getElementById("tension-slider") as HTMLInputElement;
        const updateTension = () => { water.surfaceTension = +tensionSlider.value; };
        bindInput(tensionSlider, updateTension, "input");
    }
    {
        const springSlider: HTMLInputElement = document.getElementById("spring-slider") as HTMLInputElement;
        const updateSpring = () => { water.springStiffness = +springSlider.value; };
        bindInput(springSlider, updateSpring, "input");
    }
    {
        const dispersionSlider: HTMLInputElement = document.getElementById("dispersion-slider") as HTMLInputElement;
        const updateDispersion = () => { water.dispersion = +dispersionSlider.value; };
        bindInput(dispersionSlider, updateDispersion, "input");
    }

    {
        const specularCheckbox: HTMLInputElement = document.getElementById("specular-checkbox") as HTMLInputElement;
        const updateSpecular = () => {
            viewer2D.specular = specularCheckbox.checked;
            viewer3D.specular = specularCheckbox.checked;
        };
        bindInput(specularCheckbox, updateSpecular, "change");
    }
    {
        const causticsCheckbox: HTMLInputElement = document.getElementById("caustics-checkbox") as HTMLInputElement;
        const updateCaustics = () => {
            viewer2D.caustics = causticsCheckbox.checked;
            viewer3D.caustics = causticsCheckbox.checked;
        };
        bindInput(causticsCheckbox, updateCaustics, "change");
    }
    {
        const fresnelCheckbox: HTMLInputElement = document.getElementById("fresnel-checkbox") as HTMLInputElement;
        const updateSpecular = () => {
            viewer2D.fresnel = fresnelCheckbox.checked;
            viewer3D.fresnel = fresnelCheckbox.checked;
        };
        bindInput(fresnelCheckbox, updateSpecular, "change");
    }
    {
        const amplitudeSlider: HTMLInputElement = document.getElementById("amplitude-slider") as HTMLInputElement;
        const updateAmplitude = () => {
            viewer2D.amplitude = +amplitudeSlider.value;
            viewer3D.amplitude = +amplitudeSlider.value;
        };
        bindInput(amplitudeSlider, updateAmplitude, "input");
    }
    {
        const levelSlider: HTMLInputElement = document.getElementById("level-slider") as HTMLInputElement;
        const updateWaterLevel = () => {
            viewer2D.waterLevel = +levelSlider.value;
            viewer3D.waterLevel = +levelSlider.value;
        };
        bindInput(levelSlider, updateWaterLevel, "input");
    }
    {
        const opacitySlider: HTMLInputElement = document.getElementById("opacity-slider") as HTMLInputElement;
        const updateOpacity = () => {
            viewer2D.opacity = +opacitySlider.value;
            viewer3D.opacity = +opacitySlider.value;
        };
        bindInput(opacitySlider, updateOpacity, "input");
    }
    {
        const etaSlider: HTMLInputElement = document.getElementById("refraction-slider") as HTMLInputElement;
        const updateEta = () => {
            viewer2D.eta = +etaSlider.value;
            viewer3D.eta = +etaSlider.value;
        };
        bindInput(etaSlider, updateEta, "input");
    }
}

function bind(canvas: HTMLCanvasElement, water: Water, viewer2D: Viewer2D, viewer3D: Viewer3D): void {
    bindControls(water, viewer2D, viewer3D);
}

function bindRendererChooser(choose2D, choose3D) {
    const button2D = document.getElementById("renderer-2D-button") as HTMLInputElement;
    button2D.addEventListener("change", choose2D, false);

    const button3D = document.getElementById("renderer-3D-button") as HTMLInputElement;
    button3D.addEventListener("change", choose3D, false);

    if (button2D.checked) {
        choose2D();
    } else {
        choose3D();
    }
}

export { mouse, bind, bindRendererChooser };