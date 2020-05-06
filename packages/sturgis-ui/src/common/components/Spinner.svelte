<style>
    .loading-spinner {
        display: inline-block;
        width: 50px;
        height: 50px;
        border: 3px solid gray;
        border-radius: 50%;
        border-top-color: #fff;
        animation: spin 1s ease-in-out infinite;
        -webkit-animation: spin 1s ease-in-out infinite;
    }

    @keyframes spin {
        to {
            -webkit-transform: rotate(360deg);
        }
    }
    @-webkit-keyframes spin {
        to {
            -webkit-transform: rotate(360deg);
        }
    }
</style>

<div class="is-full-screen is-horizontal-align">
    <div class="loading-spinner"></div>
</div>
