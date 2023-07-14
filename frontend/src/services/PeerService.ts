class PeerService {
  peer: any;

  /**
   * Initializes the RTCPeerConnection instance with default ICE servers if not already created.
   */
  constructor() {
    if (!this.peer) {
      this.peer = new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              "stun:stun.l.google.com:19302",
              "stun:global.stun.twilio.com:3478",
            ],
          },
        ],
      });
    }
  }

  /**
   * Retrieves the answer from the peer connection.
   * @param offer - The offer received from the peer.
   * @returns The generated answer.
   */
  async getAnswer(offer: any) {
    /* Check if peer is there or not */
    if (this.peer) {
      await this.peer.setRemoteDescription(offer);
      const ans = await this.peer.createAnswer();
      await this.peer.setLocalDescription(new RTCSessionDescription(ans));
      return ans;
    }
  }

  /**
   * Sets the local description for the peer connection.
   * @param ans - The answer received from the peer.
   */
  async setLocalDescription(answer: RTCSessionDescriptionInit) {
    if (this.peer) {
      await this.peer.setRemoteDescription(new RTCSessionDescription(answer));
    }
  }

  /**
   * Retrieves the offer from the peer connection.
   * @returns The generated offer.
   */
  async getOffer() {
    if (this.peer) {
      const offer = await this.peer.createOffer();
      await this.peer.setLocalDescription(new RTCSessionDescription(offer));
      return offer;
    }
  }
}

export default new PeerService();
