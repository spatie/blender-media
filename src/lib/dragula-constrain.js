export const constrain = (element, container) => {

    const observer = new MutationObserver(mutations => {
        mutations.filter(m => m.attributeName === 'style').forEach(() => {
            ensureElementStaysInContainer(element, container);
        });
    });

    observer.observe(element, { attributes: true });

    return {
        break: () => observer.disconnect(),
    };
};

const ensureElementStaysInContainer = (domElement, domContainer) => {

    const element = getElementValues(domElement);
    const container = getContainerValues(domContainer);

    if (element.left < container.left) {
        domElement.style.left = `${container.left}px`;
    }

    if (element.right > container.right) {
        domElement.style.left = `${container.right - element.width}px`;
    }

    if (element.top < container.top) {
        domElement.style.top = `${container.top}px`;
    }

    if (element.bottom > container.bottom) {
        domElement.style.top = `${container.bottom - element.height}px`;
    }
};

const getContainerValues = container => {

    const { scrollTop, scrollLeft } = document.body;
    const { top, left, bottom, right } = container.getBoundingClientRect();

    return {
        top: scrollTop + top,
        left: scrollLeft + left,
        bottom: scrollTop + bottom,
        right: scrollLeft + right,
    };
};

const getElementValues = element => {

    const top = parseInt(element.style.top);
    const left = parseInt(element.style.left);
    const height = element.clientHeight;
    const width = element.clientWidth;

    return {
        top, left, height, width,
        bottom: top + height,
        right: left + width,
    };
};

export default constrain;
