<script lang="ts">
	export let key: string;
	export let desc: string;
</script>

<div class="control">
	<div class="key inverted">
		{key}
	</div>
	:
	<div class="desc">
		{desc}
	</div>
</div>

<style>
	.control {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: flex-start;

		margin-right: 15px;
	}

	.control .key {
		padding: 0px 4px;
	}

	.control .desc {
		margin-left: 5px;
	}
</style>
