import ImageUpload from "./components/ImageUpload";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main id={styles.main}>
      <div id={styles.logodiv}>
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 888.32 1543.35">
          <g id="Layer_1-2" data-name="Layer_1">
            <g id="_884890944" data-name=" 884890944">
              <path className="cls-1" d="M267.33,1239.89l353.37-225.29v-468.29l-353.52,222.19,.14,471.38Zm440.56-146.81L154.29,1446.09l-.22-740.23L734.25,341.19v735.11l-26.35,16.78Z"/>
              <path className="cls-1" d="M291.09,980.76l305.78-194.9v134.06l-305.71,194.97-.07-134.13ZM620.7,384.39v-82.01l-353.52,222.12,.07,82.08-113.11,71.06-.07-215.71L734.25,97.26v215.78l-113.54,71.35Z"/>
            </g>
          </g>
        </svg>
        <p>bgremover</p>
      </div>
      <h1>Enlevez l&apos;arrière-plan de votre image</h1>
      <ImageUpload/>
      <p id={styles.credits}>Projet réalisé par Corentin Tournier, développeur web junior React/Next.js</p>
    </main>
  );
}
