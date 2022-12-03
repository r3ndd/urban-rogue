<script lang="ts">
	export let title: string;
</script>

<div class="panel">
	<div class="title">{title}</div>
	<slot />
</div>

<style>
	.panel {
		flex-grow: 1;

		position: relative;
		margin: 0px 10px 10px 0px;
		padding-top: 10px;
		border: 2px solid;
	}

	.panel:last-child {
		margin: 0px;
	}

	.title {
		position: absolute;
		top: -12px;
		left: 5px;
		padding: 1px 3px;

		background-color: var(--bg-color);
	}
</style>
